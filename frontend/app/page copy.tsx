import Image from "next/image";
import { WaitlistForm } from "./waitlists/forms";

export default function Home() {
  return (
    <div className="flex min-h-[95vh] items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <WaitlistForm/>
      </main>
    </div>
  );
}
