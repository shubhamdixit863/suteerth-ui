import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, Target, Heart, Shield } from 'lucide-react';

export function AboutPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'professional woman portrait'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Sales',
      image: 'professional man portrait'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Chief Marketing Officer',
      image: 'professional woman business'
    },
    {
      name: 'David Thompson',
      role: 'Lead Real Estate Agent',
      image: 'professional man business'
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">About RealEstate</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property since 2010
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, RealEstate began with a simple mission: to make property buying, selling, and renting easier and more transparent for everyone. What started as a small local agency has grown into one of the most trusted names in real estate.
              </p>
              <p className="text-gray-600 mb-4">
                With over a decade of experience, we've helped more than 10,000 families find their dream homes and assisted countless property owners in achieving their real estate goals. Our success is built on trust, expertise, and a genuine commitment to our clients.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we operate across multiple cities, offering a comprehensive range of services from residential sales to commercial leasing. Our team of dedicated professionals brings unparalleled market knowledge and personalized service to every transaction.
              </p>
              <Button size="lg">Get in Touch</Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="modern office team"
                alt="Our office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Target className="size-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, ensuring the best outcomes for our clients.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Shield className="size-8 text-green-600" />
                </div>
                <h3 className="text-xl mb-3">Integrity</h3>
                <p className="text-gray-600">
                  Transparency and honesty form the foundation of our relationships with clients and partners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Heart className="size-8 text-purple-600" />
                </div>
                <h3 className="text-xl mb-3">Client-Focused</h3>
                <p className="text-gray-600">
                  Your needs and satisfaction are at the heart of everything we do.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Award className="size-8 text-orange-600" />
                </div>
                <h3 className="text-xl mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We embrace technology and innovation to provide cutting-edge real estate solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="text-center p-6">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-2">15+</div>
              <p className="text-xl">Years of Experience</p>
            </div>
            <div>
              <div className="text-5xl mb-2">5,000+</div>
              <p className="text-xl">Properties Sold</p>
            </div>
            <div>
              <div className="text-5xl mb-2">10,000+</div>
              <p className="text-xl">Happy Clients</p>
            </div>
            <div>
              <div className="text-5xl mb-2">50+</div>
              <p className="text-xl">Expert Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or renting, we're here to help you every step of the way.
          </p>
          <Button size="lg">Contact Us Today</Button>
        </div>
      </section>
    </main>
  );
}
