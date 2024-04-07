import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

const ProfileDropdown = () => {
  return (
    <>
      <div className="flex flex-row-reverse items-center gap-6">
        <Dropdown
          label={<Avatar alt="User Settings" rounded status="online" />}
          arrowIcon={false}
          inline
        >
          <DropdownHeader>
            <span className="block text-sm font-poppins">Dika Wicaksono</span>
            <span className="block truncate text-sm font-medium font-poppins">
              dika@gmail.com
            </span>
          </DropdownHeader>
          <DropdownDivider />
          <DropdownItem href="/user-profile">Profile</DropdownItem>
          <DropdownItem href="/">Keluar</DropdownItem>
        </Dropdown>
        <div className="lg:block md:block hidden font-medium text-end">
          <div>Dika Wicaksono</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
