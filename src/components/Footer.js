import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center p-4 text-lg">
      <aside>
        <p>
          Copyright <FaCopyright className="inline" />{" "}
          {new Date().getFullYear()} - All right reserved by Hoang Phuc Huynh
        </p>
      </aside>
    </footer>
  );
}
