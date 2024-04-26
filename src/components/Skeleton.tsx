type Props = {
  style?: React.CSSProperties;
};

export const Skeleton = ({ style }: Props) => {
  return (
    <span
      className="skeleton-box"
      style={{
        width: '100%',
        ...style,
      }}
    ></span>
  );
};
