import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import BlogSidebar from '@/components/BlogSidebar';

// This would typically come from a database or CMS
const getPostData = (slug) => {
  // Placeholder data
  return {
    title: "The Art of Music Production",
    content: `
      <p>Music production is a complex and rewarding process that involves creativity, technical skill, and a deep understanding of sound. In this post, we'll explore the key elements of music production and how you can improve your skills.</p>
      
      <h2>Understanding the Basics</h2>
      <p>Before diving into advanced techniques, it's crucial to have a solid grasp of the fundamentals. This includes:</p>
      <ul>
        <li>Music theory</li>
        <li>Sound design</li>
        <li>Arrangement</li>
        <li>Mixing basics</li>
      </ul>

      <h2>Essential Tools for Music Production</h2>
      <p>Having the right tools can make a significant difference in your production quality. Some essential tools include:</p>
      <ul>
        <li>Digital Audio Workstation (DAW)</li>
        <li>MIDI controller</li>
        <li>Studio monitors</li>
        <li>Audio interface</li>
      </ul>

      <p>Remember, the most important tool is your creativity. Even with basic equipment, a great idea can turn into an amazing track.</p>

      <h2>Advanced Techniques</h2>
      <p>As you progress in your music production journey, you'll want to explore more advanced techniques such as:</p>
      <ul>
        <li>Sidechain compression</li>
        <li>Parallel processing</li>
        <li>Sound design with synthesizers</li>
        <li>Advanced mixing and mastering techniques</li>
      </ul>

      <p>Stay tuned for more in-depth posts on each of these topics!</p>
    `,
    date: "2023-06-01",
    author: "Russ A Buss",
    imageUrl: "/images/blog/music-production.jpg"
  };
};

export async function generateMetadata({ params }) {
  const post = getPostData(params.slug);
  return {
    title: `${post.title} | Russ A Buss Blog`,
    description: post.content.substring(0, 160),
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostData(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="w-full md:w-2/3">
          <Card className="bg-slate-100 dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                By {post.author} | {new Date(post.date).toLocaleDateString()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose dark:prose-invert max-w-none" />
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-1/3">
          <Card className="bg-slate-100 dark:bg-slate-800">
            <CardContent className="p-6">
              <BlogSidebar />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}