import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import {Avatar, Dropdown, Layout, Menu} from 'antd';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import CaretDownOutlined from "@ant-design/icons/lib/icons/CaretDownOutlined";
import {isAdmin} from "../../../app/App";
import {HomeOutlined} from "@ant-design/icons";


const Header = Layout.Header;

class AppHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick = ({key}) => {
        if (key === "logout") {
            this.props.onLogout();
        }
    };

    makeMenuForUser = () => {
        return [
            <Menu.Item key="/">
                <Link to="/">
                    <HomeOutlined style={{fontSize: '20px'}}/>
                </Link>
            </Menu.Item>,

            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
        ];
    };

    makeMenuForGuest = () => {
        return [
            <Menu.Item key="/signIn">
                <Link to="/signIn">
                    Sign In
                </Link>
            </Menu.Item>,
            <Menu.Item key="/signUp">
                <Link to="/signUp">
                    Sign Up
                </Link>
            </Menu.Item>
        ]
    };

    makeMenuForShopAdmin = () => {
        return [
            <Menu.Item key="/company" className="">
                <Link to="/company">
                    Компания
                </Link>
            </Menu.Item>,

            <Menu.Item key="/company/shops" className="">
                <Link to="/company/shops">
                    Магазины
                </Link>
            </Menu.Item>,

            <Menu.Item key="/profile"
                       className="profile-menu">
                <ProfileDropdownMenu
                    currentUser={this.props.currentUser}
                    handleMenuClick={this.handleMenuClick}
                />
            </Menu.Item>
        ]
    };

    render() {
        let menuItems;

        if (this.props.currentUser) {
            menuItems = this.makeMenuForUser();
        } else {
            menuItems = this.makeMenuForGuest();
        }

        if (isAdmin(this.props.currentUser)) {
            menuItems = this.makeMenuForShopAdmin()
        }

        return (
            <Header className="app-header">

                <div className="base-container">

                    <div className="app-title">
                        <Link to="/">
                            Spare Part Store
                        </Link>
                    </div>

                    <span className="app-language-position"></span>

                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        )
    };
}

function ProfileDropdownMenu(props) {
    const image = props.currentUser.imageUrl ? (
        <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
    ) : (
        <div className="text-avatar">
            <span>{props.currentUser.username && props.currentUser.name[0]}</span>
        </div>
    );
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <Avatar className="user-avatar-circle"
                        icon={image}>
                    {props.currentUser.name[0].toUpperCase()}
                </Avatar>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/auth/users/${props.currentUser.id}`}>
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <UserOutlined style={{marginRight: 0, fontSize: '20px'}}/>
                <CaretDownOutlined/>
            </a>
        </Dropdown>
    );
}

export default withRouter(AppHeader);