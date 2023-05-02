import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useAccountStore } from "@states/account";
import { useRouter } from "next/router";

export const ProfileComponent: IComponent = () => {
  const router = useRouter();
  const { handleLogout, username } = useAccountStore();

  return (
    <div className="flex gap-4 items-center justify-center">
      <h1 className="text-black">
        {" "}
        Hello <span className="font-[600]">{username} </span>!
      </h1>
      <picture>
        <img
          className="block w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          alt={username}
          src={`https://pub-a3633e0d2fd446d7a5b3581d1f906c0f.r2.dev/admin/hungtt.png`}
        />
      </picture>

      <div>
        <Menu placement="bottom-end">
          <MenuHandler className="cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 hover:text-gray-600 duration-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </MenuHandler>
          <MenuList
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="!px-4 !w-fit !mt-6"
          >
            <MenuItem
              className="flex items-center gap-2"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => router.replace({ query: { tab: "Info" } })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <Typography variant="small" className="font-normal">
                My Info
              </Typography>
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
              <Typography variant="small" className="font-normal">
                Edit Profile
              </Typography>
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <InboxArrowDownIcon strokeWidth={2} className="h-4 w-4" />
              <Typography variant="small" className="font-normal">
                Inbox
              </Typography>
            </MenuItem>
            <MenuItem
              className="flex items-center gap-2"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
              <Typography variant="small" className="font-normal">
                Help
              </Typography>
            </MenuItem>
            <hr className="my-2 border-blue-gray-50" />
            <MenuItem
              className="flex items-center gap-2 "
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => handleLogout()}
            >
              <PowerIcon strokeWidth={2} className="h-4 w-4" />
              <Typography variant="small" className="font-normal">
                Log Out
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
