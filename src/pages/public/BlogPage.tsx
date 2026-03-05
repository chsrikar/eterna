import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sampleBlogPosts } from '../../data/sampleData';

export default function BlogPage() {
  return (
    <div>
      <section className="gradient-hero py-12 sm:py-16 text-center">
        <div className="container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl text-soft-black mb-4"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-soft-black/60 text-lg max-w-2xl mx-auto"
          >
            Inspiration, tips, and stories about love, weddings, and self-care.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBlogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group"
              >
                <Link to={`/blog/${post.slug}`} className="no-underline block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gold-dark bg-gold/10 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-serif text-lg text-soft-black mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-muted text-sm line-clamp-3">{post.excerpt}</p>
                    <p className="text-xs text-muted mt-4">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
