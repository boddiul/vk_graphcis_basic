#version 450
#extension GL_ARB_separate_shader_objects : enable
#define KERNEL 3

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;


vec4 frameValues[KERNEL * KERNEL];
float arr[KERNEL * KERNEL];

void bubbleSort()
{
  float tmp;
  vec4 tmp4;
  int n = KERNEL * KERNEL;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++)
    {
      if (arr[j] > arr[j + 1])
      {
          tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          tmp4 = frameValues[j];
          frameValues[j] = frameValues[j + 1];
          frameValues[j + 1] = tmp4;
      }
    }
  }
}

void main() {
  int s = (KERNEL - 1) / 2;
  vec2 delta = 1.0 / textureSize(colorTex, 0);
  for (int i = 0; i <= KERNEL; i++)
  {
    for (int j = 0; j <= KERNEL; j++) {
      frameValues[KERNEL * j + i] = textureLod(colorTex, surf.texCoord + vec2(i - s, j - s) * delta , 0);
      arr[KERNEL * j + i] = dot(frameValues[KERNEL * j + i].xyz, vec3(0.299, 0.587, 0.114));
    }
  }
  bubbleSort();
  color = frameValues[KERNEL * KERNEL / 2];
  // color = textureLod(colorTex, surf.texCoord, 0);
  // color = mix(color, vec4(1., 0., 0., 0.), 0.5);
}
