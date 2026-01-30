import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle2, Upload } from 'lucide-react';

export function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyType: '',
    listingType: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <CheckCircle2 className="size-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl mb-4">Property Listing Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing us. Our team will review your listing and contact you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)}>Submit Another Property</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl mb-4">List Your Property</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Get the best value for your property with our expert marketing team
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Property Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl">Property Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyTitle">Property Title</Label>
                      <Input
                        id="propertyTitle"
                        placeholder="e.g., Modern Downtown Apartment"
                        value={formData.propertyTitle}
                        onChange={(e) => handleChange('propertyTitle', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Property Type</Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleChange('propertyType', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Listing Type</Label>
                        <Select value={formData.listingType} onValueChange={(value) => handleChange('listingType', value)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sale">For Sale</SelectItem>
                            <SelectItem value="rent">For Rent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price {formData.listingType === 'rent' ? '(per month)' : ''}</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Downtown, New York"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          placeholder="0"
                          value={formData.bedrooms}
                          onChange={(e) => handleChange('bedrooms', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="0"
                          value={formData.bathrooms}
                          onChange={(e) => handleChange('bathrooms', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area">Area (sqft)</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="0"
                          value={formData.area}
                          onChange={(e) => handleChange('area', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your property..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Property Images</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-xl">Contact Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Listing
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why List With Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h4 className="mb-1">Maximum Exposure</h4>
                    <p className="text-sm text-gray-600">Your property seen by thousands of potential buyers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h4 className="mb-1">Expert Marketing</h4>
                    <p className="text-sm text-gray-600">Professional photography and listing optimization</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl">🤝</div>
                  <div>
                    <h4 className="mb-1">Dedicated Support</h4>
                    <p className="text-sm text-gray-600">Personal agent to guide you through the process</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h4 className="mb-1">Quick Sales</h4>
                    <p className="text-sm text-gray-600">Average sale time of just 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to assist you with any questions about listing your property.
                </p>
                <Button variant="outline" className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
