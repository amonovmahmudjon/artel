import { type NotifConfig } from "@/interface/interface";
import { useSnackbar, type SnackbarKey } from "notistack"; 
import { Fragment } from "react";
import { BsXLg } from "react-icons/bs";

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: SnackbarKey) => ( 
    <Fragment>
     
        <BsXLg
		 onClick={() => {
			closeSnackbar(key);
		  }}
		  className="cursor-pointer"
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        />
    </Fragment>
  );

  const setConf = (conf: NotifConfig) => {
    if (conf?.msg) {
      let variant: "default" | "error" | "success" | "warning" | "info" = "info";
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(conf.msg, {
        variant: variant,
        autoHideDuration: conf?.duration ?? 2000,
        action: conf?.showClose ? undefined : action,
      });
    }
  };

  return setConf;
};

export default useNotification;