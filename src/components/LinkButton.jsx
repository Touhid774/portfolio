const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
};

/**
 * A link that degrades honestly: when `href` is empty (not provided yet) it
 * renders a disabled button with an explanation instead of a dead/fake link.
 */
export default function LinkButton({
  href,
  children,
  icon: Icon,
  variant = 'secondary',
  className = '',
  external = true,
  unavailableHint = 'Not available yet',
  ...rest
}) {
  const classes = `${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (!href) {
    return (
      <button type="button" disabled className={classes} title={unavailableHint} {...rest}>
        {content}
        <span className="sr-only"> ({unavailableHint})</span>
      </button>
    );
  }

  const isMail = href.startsWith('mailto:');
  const externalProps = external && !isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={classes} {...externalProps} {...rest}>
      {content}
      {external && !isMail && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
