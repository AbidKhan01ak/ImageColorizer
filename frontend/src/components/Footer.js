import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-zinc-800 text-zinc-300 text-center w-full sticky bottom-0">
            <div className="flex flex-col sm:flex-row items-center justify-between p-2">
                <a href="#home" className="mb-2 sm:mb-0">
                    <img src="/logo.svg" alt="Logo" width={40} height={40} />
                </a>
                <p className="text-zinc-500 text-sm sm:text-base">
                    &copy; 2024 <span className="mr-5 text-zinc-200">Abid Khan</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer