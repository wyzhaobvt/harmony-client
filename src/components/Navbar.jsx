import ThemeSwitcher from './ThemeSwitcher';
import Sidebar from './Sidebar';
import MicrophoneIcon from './icons/MicrophoneIcon';
import MicrophoneMuteIcon from "./icons/MicrophoneMuteIcon"

export default function Navbar() {
  return (
    <nav className="z-50 w-full bg-background sticky top-0 flex items-center px-3 justify-between group shadow-md dark:shadow-black">
      <div className="flex items-center gap-3">
        <Sidebar />
        <div className="font-bold text-2xl">Harmony</div>
        <div className='border-primary border-2 rounded-full ml-5 px-5 flex items-center justify-evenly gap-5'>forgetful-dentists<MicrophoneMuteIcon /></div>
      </div>
      <div>
        <div className="justify-self-end flex items-center w-6 h-6">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
