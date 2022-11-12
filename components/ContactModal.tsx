import React, { FC, useEffect, useRef } from "react";
import cn from "classnames";

const ContactModal: FC<{
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsCopied: (isCopied: boolean) => void;

  isModalOpen: boolean;
  isCopied: boolean;
}> = ({ isModalOpen, isCopied, setIsModalOpen, setIsCopied }) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText("ramazanerikli1@gmail.com");
    setIsCopied(true);

    setTimeout(function () {
      setIsCopied(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const openGmail = () => {
    window.open(
      "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=ramazanerikli1@gmail.com"
    );
  };

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as any)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <div
        id="contactModal"
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          isModalOpen ? "visible" : "hidden",
          "fixed top-0 right-0 left-0 flex justify-center items-center inset-0 bg-black bg-opacity-30"
        )}
      >
        <div
          ref={ref}
          className="contact-modal-content flex items-center justify-center relative p-4 w-full h-full md:h-auto"
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex flex-col items-center p-6 space-y-6">
              <strong>ramazanerikli1@gmail.com</strong>
              <a
                onClick={() => openGmail()}
                className="cursor-pointer bg-white hover:bg-red-100 px-3 py-2 rounded-2xl w-full text-center transition-all link-gmail"
              >
                open in <strong>Gmail</strong>
              </a>
              <a
                onClick={() => copyToClipBoard()}
                className="cursor-pointer bg-white hover:bg-gray-100 px-3 py-2 rounded-2xl w-full text-center transition-all"
              >
                {isCopied ? "copied!" : "copy"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
