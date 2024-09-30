// Importa el hook useRouter de Next.js para acceder a la información de la ruta
import { useRouter } from 'next/router';
// Importa Link para permitir la navegación entre páginas
import Link from 'next/link';
// Importa la lista de libros desde BookData
import books from '../../../components/BookData';
// Importa el componente StarRating para mostrar la calificación del libro
import StarRating from '../../../components/StarRating';
// Importa el componente Footer para el pie de página
import Footer from '../../../components/Footer.js';

// Componente principal para la sinopsis de un libro
const BookSynopsis = () => {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID del libro desde la ruta
  const book = books.find(b => b.id === id); // Encuentra el libro correspondiente al ID

  // Manejo de carga si el libro no se encuentra
  if (!book) return <p>Cargando...</p>; 

  // Función para manejar el clic en un género
  const handleGenreClick = (genre) => {
    // Redirige a la página de índice con el filtro de género
    router.push(`/?genre=${encodeURIComponent(genre)}`); // Cambia a '/' para apuntar a index
  };

  return (
    <div className="px-0 bg-gray-100">
      {/* Barra de navegación */}
      <nav className="mb-4 p-4 bg-gray-800 text-white">
        <Link href={`/`} className="text-blue-400 hover:underline">
          Home
        </Link>
        <span> &gt; Sinopsis</span>
      </nav>

      {/* Título principal de la página */}
      <h1 className="text-3xl font-bold text-center mb-6">Sinopsis</h1>

      {/* Contenido de la sinopsis */}
      <div className="flex ml-8 flex-col md:flex-row items-start">
        <div className="flex flex-col items-center w-full">
          {book.imageUrl && (
            <img 
              src={book.imageUrl} 
              alt={book.title} 
              className="w-60 h-70 object-cover mb-1"
            />
          )}
          {/* Botón "Escribir Reseña" */}
          <Link href={`/books/review/${book.id}`}>
            <button className="mt-2 px-5 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
              Escribir Reseña
            </button>
          </Link>
        </div>
        
        <div className="flex-1">
          <div className="mb-1 w-[1000px] h-[300px] mr-10 p-3 border border-gray-300 rounded bg-white shadow-md flex flex-col justify-center">
            <h2 className="text-4xl font-bold">{book.title}</h2>
            <h3 className="mb-3 font-bold text-gray-700">{book.author}</h3>
            <StarRating bookId={book.id} /> {/* Componente que permite calificar el libro */}
            <p className="mt-2 text-gray-700">{book.date}</p>
            <p className="mt-2 text-gray-700">{book.synopsis}</p> {/* Sinopsis del libro */}
          </div>
          {/* Géneros del libro */}
          <p className="mt-4 text-gray-700 text-center">Géneros:  
            {book.genres.split(', ').map((genre) => (
              <span 
                key={genre} 
                className="cursor-pointer text-blue-500 hover:underline" 
                onClick={() => handleGenreClick(genre)} // Manejo del clic en el género
              >
                {genre}
              </span>
            )).reduce((prev, curr) => [prev, ', ', curr])} {/* Añade comas entre géneros */}
          </p>
          <div className="mt-2 mr-10 flex justify-end">
            <div className="mb-10 w-[1000px] h-[350px] p-3 rounded bg-white shadow-md">
              <h3 className="text-lg font-semibold">Reseña:</h3>
              <p className="mt-2">{book.review || "No hay reseña disponible."}</p> {/* Muestra la reseña del libro */}
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Pie de página */}
    </div>
  );
};

// Exporta el componente BookSynopsis para su uso en otras partes de la aplicación
export default BookSynopsis;
