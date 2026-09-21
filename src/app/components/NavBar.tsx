import Link from "next/link";

const NavBar = () => {
  return (
    <div className=" border-b-2 border-b-gray-600/10 ">
      <div className="container mx-auto flex justify-between items-center mt-4 mb-4 ">
        <Link href={"/Home"}>
          <h2 className="font-bold text-2xl">Books Vibe</h2>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link href={"/app"}>
            <li>Home</li>
          </Link>
          <Link href={"/ListedBooks"}>
            <li>Listed Books</li>
          </Link>
          <Link href={"/PagesToRead"}>
            <li>Pages to Read</li>
          </Link>
        </ul>
        <div>
          <button className="btn bg-[#23BE0A] mr-3 text-white">Sign In </button>
          <button className="btn bg-[#59C6D2] text-white">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
