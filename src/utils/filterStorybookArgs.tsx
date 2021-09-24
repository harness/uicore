export default function filterStorybookArgs<ComponentProps>(args: ComponentProps): ComponentProps {
  return Object.fromEntries(
    Object.entries(args).filter(([, val]) => !(val === undefined || val === null))
  ) as ComponentProps
}
