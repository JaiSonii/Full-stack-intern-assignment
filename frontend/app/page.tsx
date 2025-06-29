"use client"

import { motion } from "framer-motion"
import { Film, Search, Star, Zap } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find movies and TV shows with intelligent search suggestions and filters",
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Rate your favorite movies and keep track of what you've watched",
    },
    {
      icon: Film,
      title: "Detailed Info",
      description: "Get comprehensive information about cast, crew, plot, and more",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Lightning-fast search results with a beautiful, responsive design",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search through millions of movies and TV shows. Get detailed information, rate your favorites, and discover
            your next binge-watch.
          </p>

          <div className="mb-8">
            <SearchBar />
          </div>

          <Link href="/movies">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Exploring
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Movie App?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with modern technologies for the best movie discovery experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-primary/5 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Discover?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of movie enthusiasts who use our app to discover, rate, and track their favorite films and TV
            shows.
          </p>
          <Link href="/movies">
            <Button size="lg" className="text-lg px-8 py-3">
              Browse Movies Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
