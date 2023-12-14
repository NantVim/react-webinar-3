import {memo} from "react";
import ProfileItem from "../profile-item";
import './style.css'

function ProfileCard({items}) {
    return(
        <div className='ProfileCard'>
            <strong className='ProfileCard-title'>Профиль</strong>
            {items.map(item => (<ProfileItem key={item.key} title={item.title} value={item.value} />))}
        </div>
    );
}

export default memo(ProfileCard);