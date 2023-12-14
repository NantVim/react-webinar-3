import { memo } from "react";
import 'style.css';

function ProfileItem({title, value, key}) {

    return (
        <div key={key} className='ProfileItem'>
            <span className="ProfileItem-title">{title}</span>
            <strong className="ProfileItem-value">{value}</strong>
        </div>
    );
}

export default memo(ProfileItem);