"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
type AddQuestionFormProps = {
  item?: [];
};

const addNewAddQuestionFormSchema = z.object({
  description: z.string().min(10, { error: "min 10 characters required" }),
  category: z.string().min(2, { error: "please select category" }),
  options: z.array(z.string()).min(4, { error: "enter four options" }),
  correctOption: z.string().min(2, { error: "please select correct option" }),
});

const Categories = ["Aptitude", "Java"];
const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ item }) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const addNewAddQuestionForm = useForm<
    z.infer<typeof addNewAddQuestionFormSchema>
  >({
    resolver: zodResolver(addNewAddQuestionFormSchema),
    defaultValues: {
      description: "",
      category: "",
      options: ["", "", "", ""],
      correctOption: "",
    },
  });

  const options = addNewAddQuestionForm.watch("options");

  const onSubmit = async (
    values: z.infer<typeof addNewAddQuestionFormSchema>
  ) => {
    const formData = new FormData();

    formData.append("description", values.description);
    formData.append("category", values.category);
    values.options.map((value) => formData.append("options[]", value));
    formData.append("correctOption", values.correctOption);

    try {
      // if (item) {
      //   // update the size api request

      //   // const response = await fetch(`/api/question/${item.id}`, {
      //   //   method: "PATCH",
      //   //   body: formData,
      //   // });

      //   // if (!response.ok) {
      //   //   setSubmitDisabled(false);
      //   //   throw new Error("Failed to submit product");
      //   // }

      //   // const data = await response.json();
      //   // setMessage("Product Updated");
      //   // console.log("Product Updated:", data);
      //   // setSubmitDisabled(false);
      //   return;
      // }

      const response = await fetch(`/api/question`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setSubmitDisabled(false);
        throw new Error("Failed to submit product");
      }

      const data = await response.json();
      setMessage("Product Updated please refresh");
      console.log("Product Updated:", data);
      setSubmitDisabled(false);

      addNewAddQuestionForm.reset();
      // add the size api request
    } catch (err) {
      console.log(err);
    }
  };

  //   useEffect(() => {
  //     if (item) {
  //       addNewAddQuestionForm.reset({
  //         value: item.value,
  //         available: item.available,
  //         // size: sizes.find((value) => value.id === item.sizeId)?.value || "",
  //         size: item.sizeId,
  //       });
  //     }
  //   }, [item, addNewAddQuestionForm, sizes]);

  return (
    <div className="flex flex-col w-full gap-y-4">
      <Form {...addNewAddQuestionForm}>
        <form
          onSubmit={addNewAddQuestionForm.handleSubmit(onSubmit)}
          className="space-y-2 w-full gap-x-4 flex flex-col"
        >
          {/* Title */}

          <FormField
            control={addNewAddQuestionForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm text-gray-700">
                  Problem Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="py-4 border rounded-none border-gray-300 text-xs"
                    placeholder="enter problem description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!item && (
            <FormField
              control={addNewAddQuestionForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Category
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {Categories.map((i, index) => (
                          <SelectItem value={i} key={index}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {[0, 1, 2, 3].map((__, index) => (
              <FormField
                key={index}
                control={addNewAddQuestionForm.control}
                name={`options.${index}`} // <-- bind each field to its array index
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700">
                      {`Option ${index + 1}`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 border rounded-none border-gray-300 text-xs"
                        placeholder={`Option ${index + 1}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <FormField
            control={addNewAddQuestionForm.control}
            name="correctOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700">
                  Correct Option
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {options.map((value, i) => (
                        <SelectItem key={i} value={value || `option-${i}`}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex justify-items-end items-end gap-x-2 self-end">
              {item && (
                <Button>
                  <Pencil />
                </Button>
              )}
              <Button type="submit" className="" disabled={submitDisabled}>
                {item ? "Update" : "add"}
              </Button>
            </div> */}

          <Button type="submit" className="" disabled={submitDisabled}>
            {item ? "Update" : "add"}
          </Button>
        </form>
      </Form>
      {message && <p className="text-green font-bold">{message}</p>}
    </div>
  );
};

export default AddQuestionForm;
