import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card-bg text-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Car Dealer App. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-primary transition duration-300">Home</Link></li>
              <li><Link href="/" className="hover:text-primary transition duration-300">About</Link></li>
              <li><Link href="/" className="hover:text-primary transition duration-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}