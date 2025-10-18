import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export const Category_Drag_Drop = () => {
  const [categories, setCategories] = useState([
    {
      id: "28",
      name: "Grocefsefries",
      priority: 28,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "27",
      name: "Elefdsctronics",
      priority: 27,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "26",
      name: "Clodsfthing",
      priority: 26,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "25",
      name: "Homsde & Garden",
      priority: 25,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "24",
      name: "Sports & Fitsdfgness",
      priority: 24,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "23",
      name: "Bsasaooks",
      priority: 23,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "22",
      name: "sxgvsdToys",
      priority: 22,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "21",
      name: "Groceriedfgs",
      priority: 21,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "20",
      name: "Elecstronics",
      priority: 20,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "19",
      name: "Clsfsothing",
      priority: 19,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "18",
      name: "Home & Gsfarden",
      priority: 18,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "17",
      name: "Fitness",
      priority: 17,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "16",
      name: "Boojtyjtks",
      priority: 16,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "15",
      name: "Tsweoys",
      priority: 15,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "1",
      name: "aawGroceries",
      priority: 1,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "2",
      name: "Electrongsgerics",
      priority: 2,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "3",
      name: "Clothinserweg",
      priority: 3,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "4",
      name: "Home & Garden",
      priority: 4,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "5",
      name: "Sports & Fitness",
      priority: 5,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "6",
      name: "Booksserfwer",
      priority: 6,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "7",
      name: "Tarweoys",
      priority: 7,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "8",
      name: "Grarfwertfewoceries",
      priority: 8,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "9",
      name: "Electronistfgewtrcs",
      priority: 9,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "10",
      name: "Clothinwetfrewg",
      priority: 10,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "11",
      name: "Home & Gardsrtfesrfewen",
      priority: 11,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "12",
      name: "Sportewrwers & Fitness",
      priority: 12,
      status: false,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "13",
      name: "Booksse",
      priority: 13,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    {
      id: "14",
      name: "Toys",
      priority: 14,
      status: true,
      image: "https://via.placeholder.com/40",
    },
    // many more...
  ]);

  const scrollContainerRef = useRef(null);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((cat, i) => ({ ...cat, priority: i + 1 }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    setCategories(
      reorder(categories, result.source.index, result.destination.index)
    );
  };

  // ✅ Auto Scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleDrag = (e) => {
      const { clientY } = e;
      const rect = container.getBoundingClientRect();

      // Top auto-scroll
      if (clientY - rect.top < 60) {
        container.scrollBy({ top: -10, behavior: "smooth" });
      }
      // Bottom auto-scroll
      else if (rect.bottom - clientY < 60) {
        container.scrollBy({ top: 10, behavior: "smooth" });
      }
    };

    window.addEventListener("dragover", handleDrag);
    return () => window.removeEventListener("dragover", handleDrag);
  }, []);

  return (
    <div className="flex-1">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={(el) => {
                provided.innerRef(el);
                scrollContainerRef.current = el; // store ref
              }}
              className="max-h-[350px] overflow-y-auto"
            >
              <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3">Order</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Priority</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((cat, index) => (
                    <Draggable key={cat.id} draggableId={cat.id} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${
                            snapshot.isDragging
                              ? "bg-blue-100 shadow-md"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td
                            {...provided.dragHandleProps}
                            className="px-6 py-4"
                          >
                            ≡
                          </td>
                          <td className="px-8 py-4">{cat.name}</td>
                          <td className="px-6 py-4">{cat.priority}</td>
                          <td className="px-6 py-4">
                            {cat.status ? "Active" : "Inactive"}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-red-500">
                              Delete
                            </button>
                            <button className="text-sm text-green-500">
                              Edit
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
