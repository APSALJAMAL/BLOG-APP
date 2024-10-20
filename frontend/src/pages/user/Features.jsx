import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import feature from '../../assets/feature.webp'
const features = [
  {
    name: 'Easy Publishing.',
    description:
      'Publish your thoughts, stories, and ideas effortlessly. Our streamlined editor makes content creation simple and enjoyable.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Access.',
    description: 'Your data is safe with end-to-end encryption and secure authentication, ensuring your privacy and protection.',
    icon: LockClosedIcon,
  },
  {
    name: 'Content Backups.',
    description: 'Never lose your posts. Our automatic backups ensure that your content is always safe and recoverable.',
    icon: ServerIcon,
  },
];

export default function BlogFeatures() {
  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Manage Your Blog</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Streamlined Workflow</p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Focus on your writing while we take care of the technical aspects. Whether you're writing a post or managing your content, we've got you covered.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Blog management screenshot"
            src={feature}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 dark:ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
