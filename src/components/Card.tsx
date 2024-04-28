import { IoIosCloudDownload } from 'react-icons/io';
import { IoReaderOutline } from 'react-icons/io5';
import Moment from 'react-moment';
import { Paper } from '../types';

type Props = {
  paper: Paper;
};

export const Card = ({ paper }: Props) => {
  let link = paper.links?.find((link: any) => link.type === 'reader')
    ? paper.links.find(link => link.type === 'reader')?.url
    : paper.links?.length > 0
    ? paper.links[0].url
    : null;

  if (!link) {
    link = paper.downloadUrl || '#';
  }

  return (
    <a
      className="card card-1"
      key={paper.id}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className="top">
        <div>
          <h3 title={paper.title}>{paper.title}</h3>
          <p>
            <Moment format="MMMM Do, YYYY">{paper.publishedDate}</Moment>
          </p>
        </div>
      </div>
      <div className="bottom">
        <p title={paper.authors.map(author => author.name).join(', ')}>
          {paper.authors.map((author: any) => author.name).join(', ')}
        </p>
        <div className="actions">
          <div className="icon-container">
            <IoIosCloudDownload
              title="Download Paper"
              onClick={(e: any) => {
                e.preventDefault();
                window.open(paper.downloadUrl, '_blank');
              }}
              className="icon"
              color="#757575"
              cursor="pointer"
            />
          </div>
          <div className="icon-container">
            <IoReaderOutline
              title="Read Abstract"
              onClick={(e: any) => {
                e.preventDefault();
                alert(paper.abstract);
              }}
              className="icon"
              color="#757575"
              cursor="pointer"
            />
          </div>
        </div>
      </div>
    </a>
  );
};
