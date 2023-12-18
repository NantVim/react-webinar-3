import {memo} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import './style.css';

function ProfileTool({username, signOut, t}) {
    return(
        <div className='ProfileTool'>
            <Link to='/profile' className='ProfileTool-title'>{username}</Link>
            {username? 
                (<Link to='/login'><button onClick={() => signOut()}>{t('profile.tool.out')}</button></Link>) : 
                (<Link to='/login'><button>{t('profile.tool.in')}</button></Link>)
            } 
        </div>
    );
}

ProfileTool.PropTypes = {
    username: PropTypes.string,
    signOut: PropTypes.func,
    t: PropTypes.func
}

ProfileTool.defaultProps = {
    username: '',
    signOut: () => {},
    t: (text) => text
}

export default memo(ProfileTool);