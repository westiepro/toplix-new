# Translation System Setup Guide

This guide will help you set up and use the advanced AI-powered translation system for your real estate website.

## Overview

The translation system supports 6 languages:
- 🇬🇧 English (source language)
- 🇵🇹 Portuguese
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇸🇪 Swedish

It includes:
- **Automatic AI translation** using OpenAI GPT-4o-mini
- **Manual translation override** capability
- **Admin dashboard** for translation management
- **Property content translation** support

## Setup Steps

### 1. Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# File: supabase-translations-schema.sql
```

This will create:
- `languages` table
- `translations` table
- `property_translations` table
- Necessary indexes and RLS policies

### 2. Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API Key (required for AI translations)
OPENAI_API_KEY=your_openai_api_key
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Initialize Translations

Run the initialization script to seed the database with languages and English translations:

```bash
# Option 1: Using ts-node (recommended)
npx ts-node scripts/init-translations.ts

# Option 2: If you prefer, start your dev server first and then run the script
npm run dev
# In another terminal:
npx ts-node scripts/init-translations.ts
```

The script will:
1. Seed the 6 languages into the database
2. Insert all English translation keys
3. Optionally auto-translate all content (requires dev server running)

### 4. Start Your Development Server

```bash
npm run dev
```

## Usage

### For Users

1. **Language Switcher**: Click the language dropdown in the navigation bar (shows current language flag)
2. **Automatic Translation**: All UI text and property listings will automatically display in the selected language
3. **Persistent Selection**: Language preference is saved to localStorage

### For Admins

#### Admin Translation Dashboard

Access the translation management interface at `/admin/translations`

Features:
- View all translation keys and their values for all languages
- See translation progress percentage for each language
- Filter by namespace (home, admin, navbar, etc.)
- Search translations
- Edit translations manually
- Auto-translate missing translations with one click
- Export/import translations as JSON

#### Translation Workflow

1. **Auto-translate all content**:
   - Go to `/admin/translations`
   - Click "Auto-translate" button for each language
   - Wait for the AI to translate all missing keys

2. **Manual editing**:
   - Click on any translation cell to edit
   - Make your changes
   - Click save ✓ or cancel ✗
   - Manual edits are marked with a green "Manual" badge

3. **Property translations**:
   - Properties are automatically translated when added
   - Use the API endpoint `/api/properties/translate` to translate existing properties

## API Endpoints

### Translation Management

```typescript
// Translate a single key
POST /api/translate
Body: {
  key: string,
  sourceText: string,
  targetLanguage: string,
  namespace: string
}

// Get all translations for a language
GET /api/translations?language=pt

// Bulk translate missing keys
POST /api/translations
Body: {
  languageCode: string,
  keys?: string[] // optional, defaults to all missing keys
}

// Update a translation (manual edit)
PUT /api/translations/[id]
Body: { value: string }

// Delete a translation
DELETE /api/translations/[id]
```

### Property Translation

```typescript
// Translate property content
POST /api/properties/translate
Body: {
  propertyId: string,
  title: string,
  description: string,
  address?: string,
  targetLanguage?: string // optional, translates to all languages if not provided
}
```

## Developer Guide

### Using Translations in Code

```typescript
// 1. Import the hook
import { useTranslation } from "@/hooks/useTranslation";

// 2. Use in your component
export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>
      
      {/* With interpolation */}
      <p>{t("welcome.message", { name: "John" })}</p>
    </div>
  );
}
```

### Using Property Translations

```typescript
import { usePropertyTranslation } from "@/hooks/usePropertyTranslation";

export function PropertyCard({ property }) {
  // Automatically gets translated version based on current language
  const translatedProperty = usePropertyTranslation(property);
  
  return (
    <div>
      <h2>{translatedProperty.title}</h2>
      <p>{translatedProperty.description}</p>
    </div>
  );
}
```

### Adding New Translation Keys

1. Add the key to `src/lib/translation-keys.ts`:

```typescript
export const TRANSLATION_KEYS = {
  myPage: {
    title: "myPage.title",
    description: "myPage.description",
  },
};

export const ENGLISH_TRANSLATIONS: Record<string, string> = {
  "myPage.title": "My Page Title",
  "myPage.description": "This is my page description",
  // ... other translations
};
```

2. Run the init script again or manually add to database:

```bash
npx ts-node scripts/init-translations.ts
```

3. Use in your components:

```typescript
const { t } = useTranslation();
<h1>{t("myPage.title")}</h1>
```

## Translation Best Practices

1. **Use descriptive keys**: `home.hero.title` instead of `title1`
2. **Organize by namespace**: Group related translations (home, admin, navbar, etc.)
3. **Keep English as source**: Always maintain accurate English translations
4. **Review AI translations**: Auto-translations are good but review important content
5. **Use interpolation**: For dynamic content like `"Welcome, {{name}}!"`
6. **Property content**: Translate property listings for better international reach

## Troubleshooting

### Translations not loading
- Check Supabase connection
- Verify RLS policies are set correctly
- Check browser console for errors

### Auto-translate not working
- Ensure OPENAI_API_KEY is set in `.env.local`
- Check API rate limits
- Verify dev server is running (for init script)

### Language switcher not appearing
- Ensure LanguageProvider is in the component tree
- Check that languages are seeded in database
- Verify Supabase connection

## Cost Considerations

- **OpenAI GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Estimated cost to translate all ~100 keys to 5 languages: < $0.10
- Property translations depend on content length
- Consider caching and manual review to minimize API calls

## Next Steps

1. ✅ Run the database schema SQL
2. ✅ Set up environment variables
3. ✅ Run initialization script
4. ✅ Auto-translate content via admin panel
5. ✅ Review and manually edit important translations
6. ✅ Test language switching on frontend
7. ✅ Translate property listings

## Support

For issues or questions:
- Check the implementation files in `/src/lib/`, `/src/contexts/`, `/src/hooks/`
- Review API routes in `/src/app/api/`
- Consult the admin translation dashboard for translation status

Happy translating! 🌍


