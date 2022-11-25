import Image from "next/image"

const Home = () => {
  const images = [
    {
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      title: "image",
      description: "description"
    },
    {
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      title: "image",
      description: "description"
    },
    {
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      title: "image",
      description: "description"
    },
    {
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      title: "image",
      description: "description"
    },
  ]
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-12">
      <div
        className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          images.map((image, i) => (
            <div key={i}
              className="my-1 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
            >
              <a _href="link" className="cursor-pointer">
                <figure>
                  <Image src={`${image.image}?auto=format&fit=crop&w=400&q=50`} width="400" height="400" className="rounded-t h-72 w-full object-cover" alt={image.title} />

                  <figcaption className="p-4">
                    <p
                      className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                      {image.title}
                    </p>

                    <small
                      className="leading-5 text-gray-500 dark:text-gray-400">
                      {image.description}
                    </small>
                  </figcaption>
                </figure>
              </a>
            </div>
          ))
        }
        <template x-for="post in posts">

        </template>
      </div>
    </section>
  )
}

export default Home