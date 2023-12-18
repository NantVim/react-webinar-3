import {memo} from "react";
import ProfileItem from "../profile-item";
import './style.css'

function ProfileCard({items, t}) {
    return(
        <div className='ProfileCard'>
            <strong className='ProfileCard-title'>{t('profile.title')}</strong>
            <ProfileItem title={t('profile.name')} value={items.name} />
            <ProfileItem title={t('profile.phone')} value={items.phone} />
            <ProfileItem title={t('profile.email')} value={items.email} />
        </div>
    );
}

export default memo(ProfileCard);