import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  features: string[];
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, features, imageSrc }) => {
  return (
    <div className="w-[100%] h-auto lg:h-[300px] flex flex-col lg:flex-row justify-between items-center gap-4 bg-zinc-50 rounded-lg shadow-lg p-4">
      <div className="w-full md:w-1/3">
        <Image src={imageSrc} alt={title} width={500} height={300} className="rounded-lg" />
      </div>
      <div className=" md:w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <ul className="list-disc list-inside text-gray-600">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">View Details</button>
      </div>
    </div>
  );
};

export default ServiceCard;
