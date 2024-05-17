import Image from "next/image";

export default function Home() {
  return (
   <>
    <section className="px-6 md:mx-20 py-24  border-2 border-red-400">
      <div className="flex ">
        <div className="flex justify-center flex-col">
          <p className="flex gap-2 text-rose-600 text-sm font-medium">
            Smart Shoping Starts Here

            <Image 
            src="/assets/icons/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow icon"
            />
          </p>
        </div>
      </div>
    </section>
   </>
  );
}
