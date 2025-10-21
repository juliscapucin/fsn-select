# Select

A curated selection of contemporary Fashion & Beauty imagery, featuring recent work from photographers on Unsplash. This collection evolves over time so you can explore, connect and collaborate with image makers from all over the world.

## Features

- 🖼️ Curated Fashion & Beauty photography from Unsplash
- ✨ Smooth animations powered by GSAP
- 🔄 Dynamic content that evolves over time
- 🌍 Discover photographers from around the globe
- 📱 Responsive design for all devices

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules / Tailwind CSS
- **Animation**: [GSAP](https://gsap.com)
- **API**: [Unsplash API](https://unsplash.com/developers)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Unsplash API access key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd select
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Unsplash API key:

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Setup

To use the Unsplash API:

1. Create an account at [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key
4. Add it to your `.env.local` file

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Photography provided by [Unsplash](https://unsplash.com)
- Animations powered by [GSAP](https://gsap.com)
- Built with [Next.js](https://nextjs.org)
