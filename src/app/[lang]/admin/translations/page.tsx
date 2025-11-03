"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { getAllNamespaces, ENGLISH_TRANSLATIONS } from "@/lib/translation-keys";
import { Download, Upload, Loader2, Save, X, Edit, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Translation {
	id: string;
	key: string;
	value: string;
	language_code: string;
	is_auto_translated: boolean;
	namespace: string;
}

interface TranslationRow {
	key: string;
	namespace: string;
	en?: string;
	pt?: Translation;
	es?: Translation;
	fr?: Translation;
	de?: Translation;
	sv?: Translation;
}

export default function AdminTranslationsPage() {
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedNamespace, setSelectedNamespace] = useState<string>("all");
	const [editingCell, setEditingCell] = useState<{ key: string; lang: string } | null>(null);
	const [editValue, setEditValue] = useState("");
	const [translating, setTranslating] = useState<string | null>(null);
	const [progress, setProgress] = useState<Record<string, { total: number; translated: number }>>({});

	const languages = [
		{ code: "en", name: "English", flag: "🇬🇧" },
		{ code: "pt", name: "Portuguese", flag: "🇵🇹" },
		{ code: "es", name: "Spanish", flag: "🇪🇸" },
		{ code: "fr", name: "French", flag: "🇫🇷" },
		{ code: "de", name: "German", flag: "🇩🇪" },
		{ code: "sv", name: "Swedish", flag: "🇸🇪" },
	];

	// Load all translations
	const loadTranslations = async () => {
		const supabase = getSupabaseClient();
		if (!supabase) {
			toast.error("Database not configured. Please check your Supabase settings.");
			setLoading(false);
			return;
		}

		try {
			const { data, error } = await supabase
				.from("translations")
				.select("*")
				.order("key");

			if (error) {
				console.warn("Translation tables not initialized yet:", error.message);
				toast.error(
					"Translation system not set up yet. Please run the SQL schema in Supabase.",
					{ duration: 5000 }
				);
				setTranslations([]);
				setLoading(false);
				return;
			}

			setTranslations(data || []);
			calculateProgress(data || []);
		} catch (error) {
			console.warn("Error loading translations:", error);
			toast.error("Translation system not initialized. See setup guide.");
			setTranslations([]);
		} finally {
			setLoading(false);
		}
	};

	// Calculate translation progress for each language
	const calculateProgress = (translationData: Translation[]) => {
		const totalKeys = Object.keys(ENGLISH_TRANSLATIONS).length;
		const progressMap: Record<string, { total: number; translated: number }> = {};

		languages.forEach((lang) => {
			const translated = translationData.filter(
				(t) => t.language_code === lang.code
			).length;
			progressMap[lang.code] = { total: totalKeys, translated };
		});

		setProgress(progressMap);
	};

	useEffect(() => {
		loadTranslations();
	}, []);

	// Group translations by key
	const translationRows: TranslationRow[] = useMemo(() => {
		const allKeys = Object.keys(ENGLISH_TRANSLATIONS);
		const rows: TranslationRow[] = [];

		allKeys.forEach((key) => {
			const namespace = key.split(".")[0];
			const row: TranslationRow = {
				key,
				namespace,
				en: ENGLISH_TRANSLATIONS[key],
			};

			translations.forEach((t) => {
				if (t.key === key) {
					if (t.language_code === "pt") row.pt = t;
					if (t.language_code === "es") row.es = t;
					if (t.language_code === "fr") row.fr = t;
					if (t.language_code === "de") row.de = t;
					if (t.language_code === "sv") row.sv = t;
				}
			});

			rows.push(row);
		});

		return rows;
	}, [translations]);

	// Filter translations
	const filteredRows = useMemo(() => {
		return translationRows.filter((row) => {
			const matchesSearch =
				searchQuery === "" ||
				row.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
				row.en?.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesNamespace =
				selectedNamespace === "all" || row.namespace === selectedNamespace;

			return matchesSearch && matchesNamespace;
		});
	}, [translationRows, searchQuery, selectedNamespace]);

	// Handle editing
	const startEdit = (key: string, lang: string, currentValue: string) => {
		setEditingCell({ key, lang });
		setEditValue(currentValue);
	};

	const cancelEdit = () => {
		setEditingCell(null);
		setEditValue("");
	};

	const saveEdit = async () => {
		if (!editingCell) return;

		const row = translationRows.find((r) => r.key === editingCell.key);
		if (!row) return;

		const translation = row[editingCell.lang as keyof TranslationRow] as Translation | undefined;

		if (translation) {
			// Update existing translation
			try {
				const response = await fetch(`/api/translations/${translation.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ value: editValue }),
				});

				if (response.ok) {
					toast.success("Translation updated");
					loadTranslations();
					cancelEdit();
				} else {
					toast.error("Failed to update translation");
				}
			} catch (error) {
				console.error("Error updating translation:", error);
				toast.error("Failed to update translation");
			}
		}
	};

	// Sync English translations from code to database
	const syncEnglishTranslations = async () => {
		try {
			toast.info("Syncing English translation keys...");
			
			const response = await fetch("/api/translations/sync-english", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Sync error:", errorText);
				toast.error("Failed to sync English translations");
				return;
			}

			const result = await response.json();
			
			if (result.success) {
				toast.success(`Synced ${result.synced} English translation keys!`);
				loadTranslations();
			} else {
				toast.error("Sync failed");
			}
		} catch (error) {
			console.error("Error syncing English translations:", error);
			toast.error("Failed to sync translations");
		}
	};

	// Auto-translate all missing for a language
	const autoTranslateLanguage = async (languageCode: string) => {
		setTranslating(languageCode);
		toast.info(`Starting translation for ${languages.find((l) => l.code === languageCode)?.name}...`);

		try {
			console.log("Sending translation request for:", languageCode);
			
			const response = await fetch("/api/translations", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ languageCode }),
			});

			console.log("Response status:", response.status);
			console.log("Response ok:", response.ok);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Response error:", errorText);
				toast.error(`Translation failed: Server returned ${response.status}`);
				setTranslating(null);
				return;
			}

			const result = await response.json();
			console.log("Translation result:", result);

			if (result.success) {
				toast.success(`Translated ${result.translated} items for ${languageCode.toUpperCase()}`);
				if (result.failed && result.failed.length > 0) {
					toast.warning(`${result.failed.length} items failed to translate`);
					console.log("Failed keys:", result.failed);
				}
				loadTranslations();
			} else {
				const errorMsg = result.error || result.details || "Unknown error";
				toast.error(`Translation failed: ${errorMsg}`);
				console.error("Translation error:", result);
			}
		} catch (error) {
			console.error("Error auto-translating:", error);
			toast.error(`Translation failed: ${error instanceof Error ? error.message : String(error)}`);
		} finally {
			setTranslating(null);
		}
	};

	// Export translations
	const exportTranslations = async (languageCode: string) => {
		const langTranslations = translations.filter((t) => t.language_code === languageCode);
		const exportData: Record<string, string> = {};

		langTranslations.forEach((t) => {
			exportData[t.key] = t.value;
		});

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `translations-${languageCode}.json`;
		a.click();
		URL.revokeObjectURL(url);

		toast.success(`Exported ${languageCode.toUpperCase()} translations`);
	};

	const namespaces = getAllNamespaces();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	// Check if translation system is not initialized
	const isNotInitialized = translations.length === 0 && !loading;

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Translations" }]} />

			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-3xl font-bold">Translation Management</h1>
					<p className="text-muted-foreground">Manage translations for all languages</p>
				</div>
				<Button onClick={syncEnglishTranslations} variant="outline" className="gap-2">
					<Download className="h-4 w-4" />
					Sync English Keys
				</Button>
			</div>

			{/* Setup Instructions Banner */}
			{isNotInitialized && (
				<Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
					<CardHeader>
						<CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
							<AlertCircle className="h-5 w-5" />
							Translation System Not Initialized
						</CardTitle>
						<CardDescription className="text-yellow-700 dark:text-yellow-300">
							Follow these steps to set up the translation system:
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2 text-sm">
							<div className="flex items-start gap-2">
								<Badge className="mt-0.5">1</Badge>
								<div>
									<p className="font-semibold">Run SQL Schema in Supabase</p>
									<p className="text-muted-foreground">
										Open your Supabase SQL Editor and run the schema from:{" "}
										<code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">
											supabase-translations-schema.sql
										</code>
									</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Badge className="mt-0.5">2</Badge>
								<div>
									<p className="font-semibold">Add OpenAI API Key</p>
									<p className="text-muted-foreground">
										Add to <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env.local</code>:{" "}
										<code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">
											OPENAI_API_KEY=your_key
										</code>
									</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Badge className="mt-0.5">3</Badge>
								<div>
									<p className="font-semibold">Run Initialization Script</p>
									<p className="text-muted-foreground">
										<code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">
											npx ts-node scripts/init-translations.ts
										</code>
									</p>
								</div>
							</div>
							<div className="flex items-start gap-2">
								<Badge className="mt-0.5">4</Badge>
								<div>
									<p className="font-semibold">Refresh This Page</p>
									<p className="text-muted-foreground">
										After setup, reload this page to start managing translations
									</p>
								</div>
							</div>
						</div>
						<Button onClick={() => window.location.reload()} className="mt-4">
							<CheckCircle className="h-4 w-4 mr-2" />
							I've completed the setup - Refresh Now
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Only show the rest if initialized */}
			{!isNotInitialized && (
				<>
			{/* Progress Cards */}
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
				{languages.map((lang) => {
					const prog = progress[lang.code] || { total: 0, translated: 0 };
					const percentage = prog.total > 0 ? Math.round((prog.translated / prog.total) * 100) : 0;

					return (
						<Card key={lang.code}>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<span className="text-2xl">{lang.flag}</span>
									<Badge variant={percentage === 100 ? "default" : "secondary"}>
										{percentage}%
									</Badge>
								</div>
								<CardTitle className="text-sm">{lang.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-xs text-muted-foreground">
									{prog.translated} / {prog.total}
								</p>
								{lang.code !== "en" && (
									<Button
										size="sm"
										variant="outline"
										className="mt-2 w-full text-xs"
										onClick={() => autoTranslateLanguage(lang.code)}
										disabled={translating === lang.code || percentage === 100}
									>
										{translating === lang.code ? (
											<Loader2 className="h-3 w-3 animate-spin" />
										) : (
											"Auto-translate"
										)}
									</Button>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
						<div className="flex-1 w-full sm:w-auto">
							<Input
								placeholder="Search translations..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="max-w-md"
							/>
						</div>
						<div className="flex gap-2">
							<Select value={selectedNamespace} onValueChange={setSelectedNamespace}>
								<SelectTrigger className="w-[200px]">
									<SelectValue placeholder="Filter by namespace" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Namespaces</SelectItem>
									{namespaces.map((ns) => (
										<SelectItem key={ns} value={ns}>
											{ns}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Translations Table */}
			<Card>
				<CardHeader>
					<CardTitle>Translations ({filteredRows.length})</CardTitle>
					<CardDescription>
						Click on any translation to edit it manually
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3 font-semibold bg-muted/50 sticky left-0 z-10">
										Key
									</th>
									{languages.map((lang) => (
										<th key={lang.code} className="text-left p-3 font-semibold bg-muted/50 min-w-[200px]">
											<div className="flex items-center gap-2">
												<span>{lang.flag}</span>
												<span>{lang.name}</span>
												{lang.code !== "en" && (
													<Button
														size="sm"
														variant="ghost"
														onClick={() => exportTranslations(lang.code)}
													>
														<Download className="h-3 w-3" />
													</Button>
												)}
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{filteredRows.map((row) => (
									<tr key={row.key} className="border-b hover:bg-muted/30">
										<td className="p-3 text-sm font-mono text-muted-foreground sticky left-0 bg-background">
											<div className="max-w-[200px] truncate" title={row.key}>
												{row.key}
											</div>
											<Badge variant="outline" className="mt-1 text-xs">
												{row.namespace}
											</Badge>
										</td>
										{languages.map((lang) => {
											const translation =
												lang.code === "en"
													? { value: row.en || "", is_auto_translated: false }
													: row[lang.code as keyof TranslationRow] as Translation | undefined;

											const value = translation
												? typeof translation === "string"
													? translation
													: translation.value
												: "";

											const isEditing =
												editingCell?.key === row.key && editingCell?.lang === lang.code;

											return (
												<td key={lang.code} className="p-3 min-w-[200px]">
													{isEditing ? (
														<div className="flex gap-1">
															<Input
																value={editValue}
																onChange={(e) => setEditValue(e.target.value)}
																className="text-sm"
																autoFocus
															/>
															<Button size="sm" variant="ghost" onClick={saveEdit}>
																<Save className="h-4 w-4 text-green-600" />
															</Button>
															<Button size="sm" variant="ghost" onClick={cancelEdit}>
																<X className="h-4 w-4 text-red-600" />
															</Button>
														</div>
													) : (
														<div className="group relative">
															<div className="text-sm">{value || "-"}</div>
															{translation && typeof translation !== "string" && (
																<div className="flex items-center gap-1 mt-1">
																	<Badge
																		variant={
																			translation.is_auto_translated
																				? "secondary"
																				: "default"
																		}
																		className="text-xs"
																	>
																		{translation.is_auto_translated ? (
																			<>
																				<AlertCircle className="h-3 w-3 mr-1" />
																				Auto
																			</>
																		) : (
																			<>
																				<CheckCircle className="h-3 w-3 mr-1" />
																				Manual
																			</>
																		)}
																	</Badge>
																	{lang.code !== "en" && (
																		<Button
																			size="sm"
																			variant="ghost"
																			className="opacity-0 group-hover:opacity-100 h-6 px-2"
																			onClick={() =>
																				startEdit(row.key, lang.code, value)
																			}
																		>
																			<Edit className="h-3 w-3" />
																		</Button>
																	)}
																</div>
															)}
														</div>
													)}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
				</>
			)}
		</div>
	);
}

