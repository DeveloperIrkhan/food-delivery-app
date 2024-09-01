import React from 'react'
import './Sidebar.css'
import {
    assets
} from '../../assets/assets'
import SidebarButtons from './SidebarButtons'
import { NavLink } from 'react-router-dom'
const AddFood = () => {
    console.log("Add Food")
}
const FoodOrder = () => {
    console.log("Order Food")
}
const FoodList = () => {
    console.log("Food List")
}
const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to={"add-category"}
                className={({ isActive }) =>
                    `${isActive ? "activebtn" : ""}`}>
                <SidebarButtons onclickFun={AddFood} text={"Add Category"} img={assets.FoodAddicon} alt={""} />
            </NavLink>
            <NavLink to={"add-food"}
                className={({ isActive }) =>
                    `${isActive ? "activebtn" : ""}`}>
                <SidebarButtons onclickFun={AddFood} text={"Add Food"} img={assets.FoodAddicon} alt={""} />
            </NavLink>
            <NavLink to={'list-order'} className={
                ({ isActive }) => `${isActive ? "activebtn" : ""}`}>
                <SidebarButtons onclickFun={FoodOrder} text={"Current Orders"} img={assets.FoodOrdericon} alt={""} />
            </NavLink>
            <NavLink to={'list-food'} className={
                ({ isActive }) => `${isActive ? "activebtn" : ""}`}>
                <SidebarButtons onclickFun={FoodList} text={"List Foods"} img={assets.FoodListicon} alt={""} />
            </NavLink>
        </div>
    )
}

export default Sidebar