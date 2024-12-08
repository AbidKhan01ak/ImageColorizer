import { headerData } from '../data/headerData';

const Header = () => {
    return (
        <header className="text-center mb-4 pb-4 bg-zinc-800 sticky top-0 w-full z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl ml-4 mt-2 font-bold text-zinc-50 sm:text-4xl">{headerData.title}</h1>
                <div className="flex justify-center items-center mt-3 gap-4 sm:mt-0 sm:flex-row">
                    <a
                        href="https://www.github.com/AbidKhan01ak"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition duration-200"
                    >
                        <img
                            src="/github.svg"
                            alt="GitHub"
                            className="w-8 h-8"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abid-khan-ak"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4 hover:opacity-80 transition duration-200"
                    >
                        <img
                            src="/linkedin.svg"
                            alt="LinkedIn"
                            className="w-8 h-8"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
