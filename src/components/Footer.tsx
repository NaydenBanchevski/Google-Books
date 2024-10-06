const Footer: React.FC = () => {
  return (
    <footer className="text-white text-center py-4 w-full">
      <hr className="border-gray-600" />
      <p className="mt-5 bg-white bg-clip-text text-transparent">
        &copy; {new Date().getFullYear()} Nayden Banchevski. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
