import React from "react";
import "./style.css";
import { Button } from "shards-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/actions";

const Header = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const signOutReq = () => {
        dispatch(signOut());
    };

    return (
        <nav className='navbar navbar-expand-md navbar-light bg-white shadow'>
            <div className='container'>
                <NavLink to='/' className='brand text-dark text-decoration-none'>
                    Code Class
                </NavLink>
                <button type='button' className='navbar-toggler'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse justify-content-end'>
                    <ul className='navbar-nav'>
                        <li className='nav-item d-flex align-items-center'>
                            <NavLink aria-current='page' className='nav-link active' to='/'>
                                Bài hướng dẫn
                            </NavLink>
                        </li>
                        {currentUser?.userType === "admin" ? (
                            <li className='nav-item d-flex align-items-center'>
                                <NavLink aria-current='page' className='nav-link active' to='/admin/tutorials'>
                                    Trang Admin
                                </NavLink>
                            </li>
                        ) : null}
                        {isAuthenticated ? null : (
                            <li className='nav-item'>
                                <NavLink aria-current='page' className='nav-link active' to='/sign-up'>
                                    <Button pill>Đăng ký</Button>
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated ? null : (
                            <li className='nav-item'>
                                <NavLink aria-current='page' className='nav-link active' to='/sign-in'>
                                    <Button pill outline>
                                        Đăng nhập
                                    </Button>
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated ? (
                            <li className='nav-item'>
                                <NavLink onClick={signOutReq} aria-current='page' className='nav-link active' to='/'>
                                    <Button pill outline>
                                        Đăng xuất
                                    </Button>
                                </NavLink>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
