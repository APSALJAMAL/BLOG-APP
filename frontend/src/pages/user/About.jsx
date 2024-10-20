export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-900 dark:text-gray-100">
          About Jamal's Blog
        </h1>
        <div className="text-md text-white-500 flex flex-col gap-6">
          <p>
            Welcome to Jamal's Blog! This blog was created to share diverse topics 
            ranging from technology, lifestyle, and personal development. Our goal 
            is to provide valuable insights and engaging content that connects with 
            a wide audience.
          </p>

          <p>
            On this blog, you'll find weekly articles and tutorials on web development, 
            software engineering, programming languages, and much more. Jamal is a 
            passionate developer always exploring new technologies and sharing learnings. 
            Be sure to check back often for fresh content!
          </p>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Meet the Author
          </h2>
          <p>
            Jamal is not just a blogger; he is a lifelong learner with a deep-seated 
            passion for coding and technology. With years of experience in the industry, 
            Jamal believes in the power of community and knowledge-sharing. Through this 
            blog, he aims to inspire others to embark on their learning journeys and 
            discover the joys of technology.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Join the Community
          </h2>
          <p>
            At Jamal's Blog, we believe that collaboration fosters growth. We encourage 
            you to leave comments on our posts and engage with other readers. You can like 
            comments and reply to them, creating a vibrant community of learners who help 
            each other grow.
          </p>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            What to Expect
          </h2>
          <p>
            Expect regular updates featuring tutorials, opinion pieces, and deep dives 
            into the latest trends in technology. We are committed to covering a wide 
            array of topics, including:
          </p>
          <ul className="list-disc list-inside text-left text-gray-600 dark:text-gray-300">
            <li>Web Development</li>
            <li>Software Engineering Practices</li>
            <li>Programming Languages and Frameworks</li>
            <li>Tips for Becoming a Better Developer</li>
            <li>Career Advice in Tech</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Future Plans
          </h2>
          <p>
            Looking ahead, we plan to expand our content offerings, including video tutorials, 
            podcasts, and guest posts from other experienced developers and tech enthusiasts. 
            Our aim is to create a multifaceted platform for learning and sharing knowledge.
          </p>

          <p className="mt-6">
            Thank you for being a part of our journey. We look forward to bringing you 
            exciting and meaningful content every week!
          </p>
        </div>
      </div>
    </div>
  );
}



