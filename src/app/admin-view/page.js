"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUser, updateStatusOfOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllOrdersForAlUser() {
    setPageLevelLoader(true);

    const res = await getAllOrdersForAllUser();

    console.log(res);
    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user._id !== user._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) {
      extractAllOrdersForAlUser();
    }
  }, [user]);

  console.log(allOrdersForAllUsers);

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAlUser();
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-8">
              <div className="flow-root">
                {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForAllUsers.map((item) => (
                      <li
                        key={item._id}
                        className="bg-gray-100 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className="font-bold text-sm mb-3 flex-1">
                            #order: {item._id}
                          </h1>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                User Name :
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {item?.user?.name}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                User Email :
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {item?.user?.email}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">
                                Paid Amount :
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                ${item?.totalPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.orderItems.map((orderItems) => (
                            <div key={orderItems.index} className="shrink-0">
                              <img
                                className="h-24 w-24 max-w-full "
                                src={
                                  orderItems &&
                                  orderItems.product &&
                                  orderItems.product.imageUrl
                                }
                                alt="Order Item"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="mt-3 inline-block mr-5 bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing
                              ? "Order is Processing"
                              : "Order is Delivered"}
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(item)}
                            disabled={!item.isProcessing}
                            className="
                           disabled:opacity-50  mt-3 inline-block mr-5 bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wide"
                          >
                            {componentLevelLoader &&
                            componentLevelLoader.loading &&
                            componentLevelLoader.id === item._id ? (
                              <ComponentLevelLoader
                                text={"Updating Order Status"}
                                color={"#ffffff"}
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              "Update Order Status"
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
