import ProfileTag from "../ProfileTag";

interface Iuser {
  name: string;
  email: string;
  occupation?: string;
  description?: string;
  city?: string;
}

interface AboutSectionProps {
  user: Iuser | null; // null gelme ihtimalini buraya da ekledik
  setUser: React.Dispatch<React.SetStateAction<Iuser | null>>;
}

const AboutSection = ({ user, setUser }: AboutSectionProps) => {
  const userData = {
    occupation: user?.occupation || "Unknown",
    description: user?.description || "Unknown",
    city: user?.city || "Unknown",
  };
  return (
    <section className="mb-12 bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-8">
      <div className="w-24 h-24 bg-[#EBB446] rounded-full flex items-center justify-center text-white text-4xl shadow-inner">
        👤
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-black text-[#4A2C21] uppercase tracking-tight mb-2">
          My Profile
        </h2>
        <div className="space-y-1 text-zinc-600">
          <p className="font-medium text-lg">
            <span className="text-[#63783A]">Name:</span> {user?.name}
          </p>
          <p className="text-sm italic opacity-75">{user?.email}</p>
        </div>
        <div className="mt-4 flex justify-center md:justify-start">
          <ProfileTag data={userData} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
