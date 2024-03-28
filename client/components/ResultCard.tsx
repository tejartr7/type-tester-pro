
import Tooltip from '@/components/Tooltop';

type ResultCardProps = {
  tooltipId: string;
  tooltipContent: string;
  tooltipPlace: 'bottom' | 'top' | 'left' | 'right';
  title: string;
  results: string;
};

const ResultCard = ({
  title,
  tooltipId,
  tooltipContent,
  tooltipPlace,
  results,
}: ResultCardProps) => {
  return (
    <Tooltip tooltipId={tooltipId}>
      <div
        className='flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg p-5'
        data-tooltip-content={tooltipContent}
        data-tooltip-id={tooltipId}
        data-tooltip-place={tooltipPlace}
      >
        <h2 className='text-3xl'>{title}</h2>
        <p
          className='text-center text-3xl'
        >
          {results}
        </p>
      </div>
    </Tooltip>
  );
};

export default ResultCard;
