import { useEffect, useRef } from "react";

export default function Icons() {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;

    script.onload = () => {
      if (iconRef.current) {
        iconRef.current.innerHTML = `
          <lord-icon
            src="https://cdn.lordicon.com/bushiqea.json"
            trigger="hover"
            style="width:250px;height:250px"
          ></lord-icon>
        `;
      }
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div ref={iconRef} />
    </div>
  );
}