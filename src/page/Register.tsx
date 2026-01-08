import RegisterForm from "../component/RegisterForm";
import ImageSlider from "../component/ImageSlider";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:mt-5">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-3xl w-full max-w-4xl md:max-w-5xl overflow-hidden">
        <div className="w-full md:w-1/2">
          <ImageSlider />
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-2px h-[70%] bg-purple-300/80"></div>
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-8 flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
