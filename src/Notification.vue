<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransitionGroup } from "vue";
import {
  inject,
  computed,
  onMounted,
  ref,
  reactive,
} from "vue";
import type { Ref } from "vue";
import type { Handler } from "mitt";

import { events } from "./events";

// Set Context from NotificationGroup
const context = inject("context") as Notiwind.NotificationContext;

// Set props
const props = withDefaults(
  defineProps<{
    maxNotifications?: number;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    move?: string;
    moveDelay?: string;
  }>(),
  {
    maxNotifications: 10,
    enter: "",
    enterFrom: "",
    enterTo: "",
    leave: "",
    leaveFrom: "",
    leaveTo: "",
    move: "",
    moveDelay: "",
  }
);

// Define the close emit
const emits = defineEmits<{
  (e: "close"): void;
}>();

// Set reference data
const notifications: Ref<Notiwind.Notification[]> = ref([]);
const timeouts: Record<number, unknown> = reactive({});

// Creates an array of all notifications sliced down to the maximum amount of notifications allowed
// reverses the order for top aligned notifications
const sortedNotifications = computed(() => {
  if (context.position === "bottom") {
    return [...notificationsByGroup.value].slice(0, props.maxNotifications);
  }

  // if not bottom reverse the array
  return [...notificationsByGroup.value]
    .reverse()
    .slice(0, props.maxNotifications);
});

// Sorts the notifications by the context group
const notificationsByGroup = computed(() => {
  return notifications.value.filter((n) => n.group === context.group);
});

// Adds a notification to this context
const add = ({ notification, timeout }: Notiwind.AddSignature) => {
  const DEFAULT_TIMEOUT = 3000;

  if (!notification) {
    console.error({ notification, timeout });
    throw new Error("No Notification sent");
  }

  notifications.value.push(notification);

  timeouts[notification.id] = setTimeout(() => {
    remove(notification.id);
  }, timeout || DEFAULT_TIMEOUT);
};
const close = (id: number) => {
  emits("close");
  remove(id);
};
const remove = (id: number) => {
  notifications.value.splice(
    notifications.value.findIndex((n) => n.id === id),
    1
  );

  if (timeouts[id]) {
    clearTimeout(timeouts[id] as number);
  }
};
onMounted(() => {
  events.on("notify", add as Handler);
  events.on("close", remove as Handler);
});
</script>

<template>
  <TransitionGroup
    v-bind="{
      'enter-active-class':
        notificationsByGroup.length > 1 ? [enter, moveDelay].join(' ') : enter,
      'enter-from-class': enterFrom,
      'enter-to-class': enterTo,
      'leave-active-class': leave,
      'leave-from-class': leaveFrom,
      'leave-to-class': leaveTo,
      'move-class': move,
    }"
  >
    <slot
      :notifications="sortedNotifications"
      :close="close"
    />
  </TransitionGroup>
</template>
