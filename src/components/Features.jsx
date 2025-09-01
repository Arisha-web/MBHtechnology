import { CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Experienced Engineers",
      description:
        "We have a team of experienced engineers and consultants having international market experience and are very well developed to handle large business Information Technology needs.",
    },
    {
      title: "Professional & Friendly Staff",
      description:
        "Our customer services team members will always listen to you and will do their level best to facilitate your inquiries as per industry standards.",
    },
    {
      title: "Available On Call 24/7",
      description:
        "We are always available on a phone call, let us know whenever our services are required, Thank you.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition"
          >
            {/* Tick Icon */}
            <CheckCircle className="text-blue-500 w-10 h-10 flex-shrink-0" />

            {/* Text */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h4>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
