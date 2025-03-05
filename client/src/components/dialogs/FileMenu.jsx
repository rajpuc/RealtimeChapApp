import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchorEl}) => {
    console.log(anchorEl)
  return (
    <Menu anchorEl={anchorEl} open={false} >
        <div style={{
            width:"10rem"
        }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, facilis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, impedit cupiditate autem ratione quos officia fugiat beatae. Excepturi, placeat et?
        </div>
    </Menu>
  )
}

export default FileMenu
