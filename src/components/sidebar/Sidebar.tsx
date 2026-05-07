import { MacCommandFilled,BankFilled,ShoppingOutlined,AntDesignOutlined,CodeSandboxCircleFilled,ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';



function Sidebar () {
      type MenuItem = Required<MenuProps>['items'][number];
      const navigate = useNavigate()
 const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Boshqaruv oynasi',
    icon: <MacCommandFilled />,
    children: [
      {
        key: '/mainlayout/dashboard/around-store',
        label: 'Magazin kesimida',
        icon:<ShoppingOutlined />
      },
      {
        key: '/mainlayout/dashboard/analitika',
        label: 'Analitika',
        icon:<AntDesignOutlined />
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Omborxona',
    icon: <CodeSandboxCircleFilled />,
    children: [
      { key: '/mainlayout/warehouse/store-house', label: 'Omborxona' },
      { key: '/mainlayout/warehouse/product', label: 'Mahsulotlar' },
      { key: '/mainlayout/warehouse/qaytarish', label: 'Mijozdan(Qaytarish)' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Moliya',
    icon: <BankFilled />,
    children: [
      { key: '/mainlayout/finance/payment-clients', label: 'Mijozga to\'lov' },
      { key: '/mainlayout/finance/inkassatsiya', label: 'Inkassatsiya' },
      { key: '/mainlayout/finance/boshqa_harajatlar', label: 'Boshqa harajatlar(Yetkazib beruvchi)' },
      { key: '11', label: 'Boshqa harajatlar(Firma)' },
      { key: '12', label: 'Valyuta almashuvi' },
      { key: '13', label: 'Yetkazib beruvchiga to\'lov' },
      { key: '14', label: 'Chiqimlar' },
      { key: '15', label: 'Kirimlar' },
    ],
  },
  {
    key: 'sub5',
    label: 'Sotuv',
    icon: <ShoppingCartOutlined />,
    children: [
      { key: '/mainlayout/sale/expense-product', label: 'Sotuv foydasi' },
      { key: '17', label: 'Qayta baholash' },
      { key: '18', label: 'Qo\'shimcha narx' },
      { key: '19', label: 'Narxlar ro\'yhati' },
    ],
  },
];
 const onClick: MenuProps['onClick'] = (e) => {
  navigate(e.key)
  };

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
           <div className="h-16 flex items-center justify-center px-6 border-b border-gray-100 mb-2 ">
      <span className="text-2xl font-black text-gray-800 tracking-tighter">
        diler<span className="text-blue-600"> uz</span>
      </span>
      
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div>
       <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['/mainlayout/dashboard/aroundStore']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
    </div>
    </div>
    </div>
   
    )
}
export default Sidebar