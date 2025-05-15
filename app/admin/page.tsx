"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectData } from '@/lib/types';
import logoImage from '../../public/images/Portfolio.png'
import Link from 'next/link'


export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : '/api/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        throw new Error('Failed to save project');
      }

      setFormData({ title: '', description: '', url: '', tags: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      url: project.url,
      tags: project.tags.join(', '),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div className="flex items-end">
            <div className="relative h-20 w-20 md:h-30 md:w-30 rounded overflow-hidden">
              <Link href="/admin">
                <Image
                  src={logoImage}
                  alt="Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 16rem, 20rem"
                  className="object-cover logo-img"
                />
              </Link>
            </div>
            <h1 className="text-3xl font-bold ml-2 md:ml-4">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                placeholder="URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Button type="submit">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
              {editingProject && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingProject(null);
                    setFormData({ title: '', description: '', url: '', tags: '' });
                  }}
                  className="ml-2"
                >
                  Cancel
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <p className="text-sm text-muted-foreground">{project.url}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-secondary px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}