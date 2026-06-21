import { useFormik } from "formik"
import FormInput from "../../global/FormInput"
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { roleAdd } from "../../../redux/actions/superAdminActions";

function RoleForm() {

    const menus =[
  "dashboard",
  "vehicles",
  "entry-vehicle",
  "clients",
  "vendors",
  "sites",
  "fuel-company",
  "fuel-stock",
  "entry-fuel",
  "income-expense",
  "settings",
  "profile"

];

const actions = ['view','create', 'update','delete']
const [selectedMenu,setSelectedMenu] = useState('')



    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            name : '',
            permissions :[],
        },
        validationSchema: '',
        onSubmit : (values, {resetForm})=>{
            console.log('role ',values)
            dispatch(roleAdd(values,resetForm))
        }
    })

    const handleMenuSelect = (e)=>{
        const selected =  e.target.value

        if (
            selected && 
            !formik.values.permissions.some((item)=> item.menu === selected)
        ){
            const updatedPermissions = [
                ...formik.values.permissions,
                {
                    menu : selected,
                    actions : {view: false, create: false, update: false, delete: false}
                }
            ];
            formik.setFieldValue('permissions',updatedPermissions)
        }
        setSelectedMenu('')
    }

    const handleRemoveMenu=(index)=>{
        const updatedPermissions = formik.values.permissions.filter((_,i)=>i !==index)
        formik.setFieldValue('permissions',updatedPermissions)
    }


  return (

<div className=" space-y-2.5">
<h2 className="font-medium text-lg">Add Role</h2>
    <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
        label = 'Role name'
        id='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder='Please enter role name'
        type="text"
        formik={formik}
        />

        <FormInput 
        label = 'Menu'
        id='menu'
        defaultOption='choose a menu'
        options={menus.filter(m => !formik.values.permissions.some(p => p.menu === m))} 
        type="select"
        value={selectedMenu}
        formik={formik}
        materialsList={formik.values.permissions}
        onChange={handleMenuSelect}
        onRemoveMaterial={handleRemoveMenu}
        
        />
</div>
        {formik.values.permissions.length > 0 && (
            <div className=" w-full mt-4 space-y-4  ">
                {formik.values.permissions.map((permission,index)=>(
                 <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="w-full md:w-[50%] lg:w-full">
                     <FormInput
                      label="Menu "
                      id={`menu-${index}`}
                      value={permission.menu.replace('-',' ')}
                      readOnly={true}
                    />
                    </div>
                    <div className=" grid grid-cols-3 md:grid-cols-5 gap-y-1 gap-x-5 ">
                    {actions.map((action)=>{
                        return(
                             <label key={action}   className="  flex justify-start items-center gap-1"
>
                                <input 
                                type="checkbox" 
                                name={`permissions.${index}.actions.${action}`}
                                checked={
                                    formik.values.permissions[index].actions[action]
                                }
                                onChange={formik.handleChange}
                                className="cursor-pointer text-sm "
                                />
                                <span className="text-sm">
                                    {action}
                                </span>
                            </label>
                        )
                    })}
                    <div className="flex lg:self-end justify-end pt-2 lg:pt-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveMenu(index)}
                    className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all cursor-pointer h-[38px] w-full lg:w-12 flex items-center justify-center border border-red-100"
                    title="Delete Row"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                    </div>

                    
                    </div>
                ))}

            </div>
        )}




        {/* {formik.values.permissions.map((permission,index)=>(
            <div key= {permission.menu}>
                <h3>{permission.menu}</h3>
                <div>
                    {["view","create","update","delete"].map(action=>(
                        <label kay={action}>
                                <input 
                                type="checkbox" 
                                name={`permissions.${index}.actions.${action}`}
                                checked={
                                    formik.values.permissions[index].actions[action]
                                }
                                onChange={formik.handleChange}
                                />
                                <span>
                                    {action}
                                </span>
                            </label>
                    ))}
                </div>
            </div>
        ))} */}

        <button type="submit" 
              className="px-8 py-3 mt-4 bg-[#1C1C1E] text-white text-xs font-medium rounded-xl hover:bg-black border border-transparent transition cursor-pointer min-w-[110px]"
        >
            Create role
        </button>


    </form>
</div>
)
}

export default RoleForm