include_directories(../../../external/volk)
include_directories(../../../external/vkutils)
include_directories(../../../external/imgui)
include_directories(../../../external)
include_directories(../../)

if(CMAKE_SYSTEM_NAME STREQUAL Windows)
    include_directories(../../../external/glfw/include)
    link_directories(../../../external/glfw)
else()
    find_package(glfw3 REQUIRED)
    include_directories(../../${GLFW_INCLUDE_DIRS})
endif()

# vk_utils source code files used by this project
# you can add other files (i.e. ray tracing helpers) when you'll need them
set(VK_UTILS
        ../../../external/vkutils/vk_copy.cpp
        ../../../external/vkutils/vk_utils.cpp
        ../../../external/vkutils/vk_buffers.cpp
        ../../../external/vkutils/vk_descriptor_sets.cpp
        ../../../external/vkutils/vk_images.cpp
        ../../../external/vkutils/vk_swapchain.cpp
        ../../../external/vkutils/vk_pipeline.cpp
        ../../../external/vkutils/geom/vk_mesh.cpp
        ../../../external/vkutils/geom/cmesh.cpp
        ../../../external/vkutils/vk_quad.cpp
        ../../../external/vkutils/vk_fbuf_attachment.cpp)

set(SCENE_LOADER
        ../../loader_utils/pugixml.cpp
        ../../loader_utils/hydraxml.cpp
        ../../loader_utils/images.cpp)

set(IMGUI_SRC
        ../../../external/imgui/imgui.cpp
        ../../../external/imgui/imgui_draw.cpp
        ../../../external/imgui/imgui_tables.cpp
        ../../../external/imgui/imgui_widgets.cpp
        ../../../external/imgui/imgui_demo.cpp
        ../../../external/imgui/backends/imgui_impl_vulkan.cpp
        ../../../external/imgui/backends/imgui_impl_glfw.cpp

        ../../../external/imgui/misc/cpp/imgui_stdlib.cpp
        )

set(RENDER_SOURCE
        #../../render/scene_mgr.cpp
        quad2d_render.cpp
        ../../render/render_gui.h ../../render/render_imgui.cpp)

add_executable(quad_renderer main.cpp ../../glfw_window.cpp ${VK_UTILS} ${SCENE_LOADER} ${RENDER_SOURCE} ${IMGUI_SRC})

if(CMAKE_SYSTEM_NAME STREQUAL Windows)
    set_target_properties(quad_renderer PROPERTIES VS_DEBUGGER_WORKING_DIRECTORY "${CMAKE_RUNTIME_OUTPUT_DIRECTORY}")

    target_link_libraries(quad_renderer PRIVATE project_options
                          volk glfw3 project_warnings)
else()
    target_link_libraries(quad_renderer PRIVATE project_options
                          volk glfw project_warnings) #
endif()