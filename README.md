# Professional Photography Portfolio

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

Next.js-based portfolio website for a professional photographer integrated with Contentful CMS. Features include:

- Gallery displays with multiple categories
- Pricing package showcases
- Contact form integration
- Dynamic content management through Contentful

### Contentful Content Models

Required content models in Contentful:

#### 1. Galleries

- Title (Short Text)
- Slug (Short Text)
- Featured Image (Asset)
- Category (Short Text)
- Description (Long Text)
- Photos (Multiple Assets)

#### 2. Pricing Packages

- Package Name (Short Text)
- Price (Number)
- Duration (Short Text)
- Features (Rich Text)
- Featured (Boolean)

#### Contact Information  

- Business Name (Short Text)
- Email (Short Text)
- Phone (Short Text)
- Social Media Links (Short Text, Multiple)

### Development Workflow

- Content edits: Use Contentful web interface
- Frontend changes: Modify components in `app/`
- Preview content: Run local dev server and refresh pages

### Deployment Considerations

- Set environment variables in production host
- Contentful CDN cache: Clear cache after content updates
- Enable SSL for API communications
- Recommended hosting platforms:
- Vercel (with Next.js integration)
- Netlify
- AWS Amplify

## Original Next.js Documentation

For framework-specific features, refer to the [Next.js documentation](https://nextjs.org/docs).
