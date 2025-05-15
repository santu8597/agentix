import FeatureCard from "@/components/frontend/feature-card"
import {
  BotIcon,
  SparklesIcon,
  DatabaseIcon,
  ShieldIcon,
  FileTextIcon,
  ServerIcon,
  LockIcon,
  ZapIcon,
} from "@/components/frontend/feature-icons"

export default function FeaturesSection() {
  const features = [
    {
      icon: <BotIcon />,
      title: "Dynamic Tool Execution",
      description:
        "Agents can call multiple real-world tools like web search, email, shell commands, and more based on context.",
      accentColor: "rgba(36, 101, 237, 0.5)",
    },
    {
      icon: <SparklesIcon />,
      title: "Prompt Playground",
      description: "Craft, test, and iterate on AI prompts with live feedback in an intuitive interface.",
      accentColor: "rgba(236, 72, 153, 0.5)",
    },
    {
      icon: <DatabaseIcon />,
      title: "Selective Tool Use",
      description: "Activate only the tools you need per agent session for optimal performance and security.",
      accentColor: "rgba(34, 211, 238, 0.5)",
    },
    {
      icon: <ShieldIcon />,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, compliance controls, and data sovereignty options for sensitive applications.",
      accentColor: "rgba(132, 204, 22, 0.5)",
    },
    {
      icon: <FileTextIcon />,
      title: "Modular & Extensible",
      description: "Easily add or remove tools via clean interfaces and extend functionality with custom components.",
      accentColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      icon: <ServerIcon />,
      title: "Modern Tech Stack",
      description: "Built with Next.js, Tailwind, TypeScript, and the Vercel AI SDK for optimal performance.",
      accentColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      icon: <LockIcon />,
      title: "Vector-based Memory",
      description:
        "Sophisticated memory system allows agents to recall past interactions and maintain context over time.",
      accentColor: "rgba(251, 191, 36, 0.5)",
    },
    {
      icon: <ZapIcon />,
      title: "Toolchain Builder",
      description: "Create multi-step workflows by chaining tools together for complex task automation.",
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="features" aria-labelledby="features-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Key Features
            </div>
            <h2 id="features-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Agent Framework
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Phoenix combines AI reasoning with real-world actions through a flexible and extensible architecture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
